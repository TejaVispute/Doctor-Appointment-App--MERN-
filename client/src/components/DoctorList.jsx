import { useNavigate } from "react-router-dom";
const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="card"
        style={{
          cursor: "pointer",
        }}
        onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
      >
        <div className="card-header">
          Dr. {doctor.firstName} {doctor.lastName}
        </div>
        <div className="card-body">
          <p>
            <b>Specilization</b> : {doctor.specilization}
          </p>
          <p>
            <b>Experience</b> : {doctor.experience}
          </p>
          <p>
            <b>fees Per Cunsaltation</b> : {doctor.feesPerCunsaltation}
          </p>
          <p>
            <b>Timing</b> : {doctor.timing[0]} - {doctor.timing[1]}
          </p>
        </div>
      </div>
    </>
  );
};

export default DoctorList;
