import React, { useEffect, useState } from 'react';
import api from '../../../services/api';

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await api.get('/jobseeker/applied-jobs');
        setAppliedJobs(response.data.appliedJobs);
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
      }
    };

    fetchAppliedJobs();
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Jobs You've Applied To</h2>
      {appliedJobs.length > 0 ? (
        appliedJobs.map((job) => (
          <div key={job.id} className="mb-4 p-4 border rounded">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p>{job.description}</p>
            <p>
              <strong>Date Applied:</strong>{' '}
              {new Date(job.date_applied).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <p>You haven't applied to any jobs yet.</p>
      )}
    </div>
  );
};

export default AppliedJobs;
