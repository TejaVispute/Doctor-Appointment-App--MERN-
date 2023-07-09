const doctorModel = require('../models/doctorModel');

// for getting doctor info 
const getDoctorInfoController = async (req, res) => {
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


// update profile of doctor
const updateProfileController = async (req, res) => {
    console.log(req.body)

    try {
        const doctor = await doctorModel.findOneAndUpdate(
            { userId: req.body.userId },
            req.body
        );

        res.status(201).send({
            success: true,
            message: "Doctor Profile Updated Successfully",
            data: doctor
        })

        // console.log(doctor)

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, error, message: "Error Updating Profile" });
    }

}

const getDoctorByIdController = async (req, res) => {

    try {
        const doctor = await doctorModel.findOne({ _id: req.body.doctorId });

        res.status(200).send({
            success: true,
            message: "Single Doctor info Fetched",
            data: doctor

        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in single doctor info"
        })
    }
}

module.exports = {
    getDoctorInfoController,
    updateProfileController,
    getDoctorByIdController
}