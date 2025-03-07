import React, { useState} from "react";
import { Button, Input, Modal, message} from "antd";
import { useAddFeedbackMutation, useUpdateFeedbackMutation, useDeleteFeedbackMutation} from "../../../store/Apis/feedbackApis";
import { eventApi } from "../apis";
import { useDispatch } from "react-redux";
import { getUserId } from "../../../utils/authHelpers";
import { getToken } from "../../../utils/authHelpers";

const Feedback = ({ feedbacks, eventId}) => {
    const [addFeedback ] = useAddFeedbackMutation();
    const [updateFeedback ] = useUpdateFeedbackMutation();
    const [deleteFeedback ] = useDeleteFeedbackMutation();
    
    const [newFeedback, setNewFeedback] = useState("");
    const [editingText, setEditingText] = useState("");
    const [editFeedbackId, setEditingFeedId] = useState(null);
    const [open, setOpen] = useState(false);

    const userId = getUserId();
    const dispatch = useDispatch();

    const handleAdd = async () => {
      const token = getToken();
      if(token){
        if (newFeedback.trim()) {
          try{
            await addFeedback({"feedback": { "feedback": newFeedback,"event_id": eventId, "user_id": userId }});
            setNewFeedback("");
            message.success('Feedback created successfully!');
            dispatch(eventApi.util.invalidateTags(["Events"]))
          }catch(err){
             message.error('Error creating feedback. Please try again.');
             console.error('Error:', err);
          }
        }
      }
      else{
        setOpen(true);
      }
    };
  
    const handleEdit = async (id) => {
      console.log(editingText);
      await updateFeedback({ id,"feedback": { "feedback": editingText }});
      setEditingText("");
      dispatch(eventApi.util.invalidateTags(["Events"]))
    };
  
    const handleDelete = async (id) => {
      await deleteFeedback(id);
      dispatch(eventApi.util.invalidateTags(["Events"]))
    };
  
    return (
      <div className="p-4 border rounded-lg shadow">
        <Input.TextArea
          value={newFeedback} 
          onChange={(e) => setNewFeedback(e.target.value)} 
          placeholder="Add feedback..." 
        />
        <Button onClick={handleAdd} className="mt-2">Submit</Button>

      
        <div className="mt-4">
          {feedbacks?.map((fb) => (
            <div key={fb.id} className="p-2 border-b flex justify-between items-center flex-wrap">
                <p className="text-gray-700">{fb.feedback}</p>
                <p className="text-gray-500 text-sm mt-1">
                  - {fb.user.first_name} {fb.user.last_name}
                </p>
              {(editingText && editFeedbackId===fb.id) &&
                  <Input.TextArea
                  value={editingText} 
                  onChange={(e) => setEditingText(e.target.value)}
                  />
              }
              <div >
                {userId === fb.user.id &&
                  <>
                  {
                    (editingText && editFeedbackId===fb.id) ?(
                      <>
                      <Button onClick={() => {
                        setEditingText("");
                        setEditingFeedId("");
                      }}>Cancle</Button>
                      <Button onClick={() => handleEdit(fb.id)} className="mr-2">Save</Button>
                      </>
                    ):(
                      <Button onClick={() =>{
                        setEditingText(fb.feedback);
                        setEditingFeedId(fb.id)
                      }} className="mr-2">Edit</Button>
                    )
                  }
                    <Button onClick={() => handleDelete(fb.id)}>Delete</Button>
                  </>
                  }
              </div>
            </div>
          ))}
        </div>
        <Modal
          title="Unautherized ..."
          centered
          open={open}
          onCancel={() => setOpen(false)}
          width={1000}
        >
          <p>Get Logged In...</p>
      </Modal>
      </div>
    );
  };
  
  export default Feedback;

  
