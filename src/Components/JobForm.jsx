import { useState } from "react";

const JobForm = () => {

    const [jobData, setJobData] = useState({
        jobtype: '',
        jobrole: '',
        experience: '',
        eligibility: '',
        country: '',
        state: '',
        roledescription: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setJobData((prev) => (
            {
                ...prev,
                [id]: value
            }
        ))
    }



    return (
        <>
            <div className="bg-white rounded-lg md:w-1/3  w-4/5 p-10 mx-auto my-4 py-5 border border-gray-300">
                <form className="max-w-sm mx-auto">
                    <h1 className="font-semibold text-lg mb-2.5 text-center">Job Form</h1>
                    <div className="mb-1.5">
                        <label htmlFor="jobtype" className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white">Job Type</label>
                        <select id="jobtype" onChange={handleChange} value={jobData.jobtype} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option>Choose the job type</option>
                            <option>Full-Time</option>
                            <option>Part-Time</option>
                            <option>Internship</option>
                            <option>Contract</option>
                        </select>
                    </div>
                    <div className="mb-1.5">
                        <label htmlFor="jobrole" className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white">Job Role</label>
                        <select id="jobrole" onChange={handleChange} value={jobData.jobrole} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option>Choose the job role</option>
                            <option>Fresher</option>
                            <option>Frontend Developer</option>
                            <option>Backend Developer</option>
                            <option>Full Statck Developer</option>
                            <option>Software Developer</option>
                            <option>Web Developer</option>
                            <option>App Developer</option>
                        </select>
                    </div>
                    <div className="mb-1.5">
                        <label htmlFor="experience" className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white">Experience</label>
                        <select id="experience" onChange={handleChange} value={jobData.experience} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option>Choose the experience</option>
                            <option>0-1 year</option>
                            <option>2-4 year</option>
                            <option>5-9 year</option>
                            <option>10+ year</option>
                        </select>
                    </div>
                    <div className="mb-1.5">
                        <label htmlFor="eligibility" className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white">Eligibility</label>
                        <select id="eligibility" onChange={handleChange} value={jobData.eligibility} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option>Choose your eligibility</option>
                            <option>Graduate</option>
                            <option>Post-Graduate</option>
                            <option>Diploma</option>
                            <option>10th</option>
                        </select>
                    </div>
                    <div className="mb-1.5">
                        <label htmlFor="joblocation" className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white">Job Location</label>
                        <label htmlFor="country" className="ml-0.5 block mb-1.5 text-xs font-normal text-gray-900 dark:text-white">Country</label>
                        <select id="country" onChange={handleChange} value={jobData.country} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-1.5" required>
                            <option>Choose your country</option>
                            <option>India</option>
                            <option>BanglaDesh</option>
                            <option>China</option>
                            <option>United State</option>
                            <option>Indonesia</option>
                            <option>United Kingdom</option>
                            <option>Nepal</option>
                        </select>
                        <label htmlFor="state" className="ml-0.5 block mb-1.5 text-xs font-normal text-gray-900 dark:text-white">State</label>
                        <select id="state" onChange={handleChange} value={jobData.state} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option>Choose your state</option>
                            <option>Uttar Pradesh</option>
                            <option>Gujrat</option>
                            <option>Delhi</option>
                            <option>Maharastra</option>
                            <option>Andhra Pradaesh</option>
                            <option>Rajasthan</option>
                            <option>Karnatak</option>
                        </select>
                    </div>
                    <div className="mb-1.5">
                        <label htmlFor="roledescription" className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white">Role Description</label>
                        <textarea type="text" id="roledescription" onChange={handleChange} value={jobData.roledescription} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" rows='3' required />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto mt-2 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </>
    )
}

export default JobForm;