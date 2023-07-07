const doctorModel = require('../models/doctorModel')
const getDoctorInfoController = async (req, res) => {
    console.log(req.params)
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId });
        res.status(200).send({
            success: true,
            message: 'Doctor Data fetch successfully',
            data: doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in fetching details"
        })
    }
}


module.exports = { getDoctorInfoController }