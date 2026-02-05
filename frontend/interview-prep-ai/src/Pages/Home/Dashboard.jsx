import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu';
import { CARD_BG } from '../../utils/data';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import moment from 'moment';
import Modal from "../../components/Modal"
import SummaryCard from '../../components/cards/SummaryCard';
import CreateSessionForm from './CreateSessionForm';
// import DeleteAlertContent from '../../components/DeleteAlertContent';

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching session data:", error);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));
      toast.success("Session Deleted Successfully");

      setOpenDeleteAlert({
        open: false,
        data: null
      });
      fetchAllSessions();
    } catch (error) {
      console.log("Error deleting session data:", error);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className='container mx-auto pt-4 pb-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0'>
          {sessions?.length === 0 ? (
            // 👇 Empty State Card
            <div className="col-span-1 md:col-span-3 flex flex-col items-center justify-center bg-gradient-to-r from-orange-50 to-orange-100 border border-dashed border-orange-300 rounded-2xl p-8 text-center shadow-sm">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">
                No Sessions Yet
              </h2>
              <p className="text-gray-500 mb-5 max-w-md">
                You haven’t created any interview prep sessions yet. Start by creating your first session and begin preparing smarter 🚀.
              </p>
              <button
                onClick={() => {
                console.log("ADD CLICKED");
                setOpenCreateModal(true);
                  }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-white font-medium rounded-full hover:shadow-lg hover:shadow-orange-300 transition-all"
              >
                <LuPlus className="text-lg" />
                Create Your First Session
              </button>
            </div>
          ) : (
            sessions?.map((data, index) => (
              <SummaryCard
                key={data?._id}
                colors={CARD_BG[index % CARD_BG.length]}
                role={data?.role || ""}
                topicsToFocus={data?.topicsToFocus || ""}
                experience={data?.experience || "-"}
                questions={data?.questions?.length || "-"}
                description={data?.description || ""}
                lastUpdated={
                  data?.updatedAt ? moment(data.updatedAt).format("Do MMM YYYY") : ""
                }
                onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                onDelete={() => setOpenDeleteAlert({ open: true, data })}
              />
            ))
          )}
        </div>

        {/* Floating Add Button → only visible if sessions exist */}
        {sessions?.length > 0 && (
          <button
            className='h-12 md:h-12 flex items-center justify-center gap-3 bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-20 transition-colors'
            onClick={() => setOpenCreateModal(true)}
          >
            <LuPlus className='text-2xl text-white' />
            Add New
          </button>
        )}
      </div>

      {/* Create Session Modal */}
      <Modal isOpen={openCreateModal} onClose={() => { setOpenCreateModal(false); }} hideHeader>
        <div>
          <CreateSessionForm />
        </div>
      </Modal>

      {/* Delete Alert Modal */}
      {/* <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => {
          setOpenDeleteAlert({ open: false, data: null });
        }}
        title="Delete Alert"
      >
        <div>
          <DeleteAlertContent
            content="Are you sure want to delete this session details?"
            onDelete={() => deleteSession(openDeleteAlert.data)}
          />
        </div>
      </Modal> */}
    </DashboardLayout>
  );
};

export default Dashboard;