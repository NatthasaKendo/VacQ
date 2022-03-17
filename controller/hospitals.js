const Hospital = require("../models/Hospital");

exports.getHospitals = async (req, res, next) => {
  let query; 

  //* Copy req.query
  const reqQuery = { ...req.query };

  //* Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  //* Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);
  console.log(reqQuery);

  //* Create query string
  let queryStr = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(/\b(gte|gt|lte|lt|in)\b/g, match => `$${match}`);
  query = Hospital.find(JSON.parse(queryStr)).populate('appointments');

  //* Select Fields
  if (req.query.select) {
    const field = req.query.select.split(",").join(" ");
    query = query.select(field);
  }

  //* Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else { 
    query = query.sort("-createdAt");
  }

  //* Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Hospital.countDocuments();

  query = query.skip(startIndex).limit(limit);

  try { //* Execute query
    const hospitals = await query;
    console.log(req.query);
    //* Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    }
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    }
  }
    res.status(200).json({
      success: true, 
      count: hospitals.length,
      data: hospitals
    })
  } catch (err) {
    res.status(400).json({success: false})
  }
};

exports.getHospital = async (req, res, next) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      res.status(400).json({
      success: false
    })
    }
    res.status(200).json({
      success: true, 
      data: hospital
    })
  } catch (err) {
    res.status(400).json({
      success: false
    })
  }
};

exports.createHospital = async (req, res, next) => {
  const hospital = await Hospital.create(req.body);
  res.status(201).json({
    success: true,
    data: hospital
  });
};

exports.updateHospital = async (req, res, next) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
      new: true, 
      runValidators: true
    });

    if (!hospital) {
      return res.status(400).json({
        success: false
      })
    }
    res.status(200).json({
      success: true, 
      data: hospital
    })
  } catch (err) {
    res.status(400).json({
        success: false
    })
  }
};

exports.deleteHospital = async (req, res, next) => {
  try {
    const hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      return res.status(400).json({
        success: false,
        msg: "not found"
      })
    }

    await hospital.remove();

    res.status(200).json({
      success: true,
      data: {}
    })
  } catch (err) {
    res.status(400).json({
      success: false
    })
  }
};
