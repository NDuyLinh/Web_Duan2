import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { isShowDateModal } from "../reducer/slices/ModalSlice";
import { setFilterDate } from "../reducer/slices/GlobalSlice";
import moment from "moment";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Modal = () => {
  const dispatch = useDispatch();
  const {showDateModal} = useSelector(state => state.modalSlice);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState(null);
  if(!showDateModal) return false;

  const hideModal = () => {
    dispatch(isShowDateModal(false));
  }

  const searchDate = () => {
    const validDate = moment(endDate).diff(moment(startDate), 'months', true);
    if(parseFloat(validDate.toFixed(2)) > 1) {
      setErrorMessage("Maximum of a filter is 1 month.");
      return;
    }
    dispatch(setFilterDate({
      type: "custom",
      startDate: moment(startDate).format("DD/MM/yyyy"),
      endDate: moment(endDate).format("DD/MM/yyyy")
    }));
    dispatch(isShowDateModal(false));
  }

  return (
    <>
    <div
      className="modal fade show show-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-hidden="true"
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Custom date
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => hideModal()}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-xl-6">
                <div className="input-group mb-3">
                  <label>Start date:</label>
                  <DatePicker 
                    dateFormat="dd/MM/yyyy"
                    selected={startDate}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    className="form-control"
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
              </div>
              <div className="col-xl-6">
                <div className="input-group mb-3">
                  <label>End date:</label>
                  <DatePicker 
                    dateFormat="dd/MM/yyyy"
                    selected={endDate}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    className="form-control"
                    onChange={(date) => setEndDate(date)}
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="text-reddit">{errorMessage}</p>
            </div>
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={() => searchDate()}
            >
              Search
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              data-bs-dismiss="modal" 
              onClick={() => hideModal()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <div className="background-out"/>
    </div>
    <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default Modal;
