const axios = require('axios');
const { exec } = require('child_process');
const path = require('path');

// const baseUrl = 'https://ms.vietnamworks.com/job-search/v1.0/search';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const searchJobs = async (req, res, next) => {
    try {
        const apiUrl = `https://ms.vietnamworks.com/job-search/v1.0/search`;

        // const requestData = req.body;
        const keyword = req.body.keyword
        // console.log(keyword);

        const bodyToSendRequest = {
            "userId": 0,
            "query": `${keyword}`,
            "filter": [
                {
                    "field": "workingLocations.cityId",
                    "value": "24,29"
                },
                {
                    "field": "workingLocations.districtId",
                    "value": "[{\"cityId\":24,\"districtId\":[-1]},{\"cityId\":29,\"districtId\":[-1]}]"
                }
            ],
            "ranges": [],
            "order": [],
            "hitsPerPage": 20,
            "page": 0,
            "retrieveFields": [
                "address",
                "benefits",
                "jobTitle",
                "salaryMax",
                "isSalaryVisible",
                "jobLevelVI",
                "isShowLogo",
                "salaryMin",
                "companyLogo",
                "userId",
                "jobLevel",
                "jobLevelId",
                "jobId",
                "jobUrl",
                "companyId",
                "approvedOn",
                "isAnonymous",
                "alias",
                "expiredOn",
                "industries",
                "industriesV3",
                "workingLocations",
                "services",
                "companyName",
                "salary",
                "onlineOn",
                "simpleServices",
                "visibilityDisplay",
                "isShowLogoInSearch",
                "priorityOrder",
                "skills",
                "profilePublishedSiteMask",
                "jobDescription",
                "jobRequirement",
                "prettySalary",
                "requiredCoverLetter",
                "languageSelectedVI",
                "languageSelected",
                "languageSelectedId",
                "typeWorkingId",
                "createdOn",
                "isAdrLiteJob",
                "summary"
            ]
        }

        const response = await axios.post(apiUrl, bodyToSendRequest);
        const data = response.data['data'];
        const selectedKeys = ['jobTitle', 'jobUrl', 'companyName', 'companyLogo', 'jobDescription', 'jobRequirement', 'skills', 'benefits', 'workingLocations', 'address', 'jobLevel', 'prettySalary', 'rangeAge', 'salaryCurrency'];

        const filteredData = data.map(item => {
            const newObj = {};
            selectedKeys.forEach(key => {
                newObj[key] = item[key];
            });
            return newObj;
        });

        res.status(200).json({
            message: 'Get list jobs success',
            data: filteredData
        });
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message
        });
    }
};

const findCompanyByName = async (req, res, next) => {
    try {
        const apiUrl = `https://ms.vietnamworks.com/company-profile/v1.0/company/search`;

        const keyword = req.body.keyword
        // console.log(keyword);

        const bodyToSendRequest = {
            "query": `${keyword}`,
            "order": [],
            "facets": [],
            "hitsPerPage": 10,
            "filter": [],
            "page": 0,
            "userId": 0,
            "isJobs": true
        }

        const response = await axios.post(apiUrl, bodyToSendRequest);
        const data = response.data['data'][0];
        const selectedKeys = ['companyId', 'companyName', 'companyLogoURL', 'companyProfile', 'website', 'jobImageURLs', 'address', 'workingLocation', 'industries', 'followerCount', 'onlineJobCount', 'bannerDesktopUri', 'jobs'];

        const filteredData = {};
        selectedKeys.forEach(key => {
            if (data.hasOwnProperty(key)) {
                filteredData[key] = data[key];
            }
        });

        res.status(200).json({
            message: 'Get company success',
            data: filteredData
        });
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message
        });
    }
};

const predictCareer = async (req, res, next) => {
    try {
        // example body
        // {
        //     "age": 22,
        //     "gpa": 3.5,
        //     "domain": "Artificial Intelligence",
        //     "projects": "Web Development",
        //     "python": 3,
        //     "sql": 3,
        //     "java": 2
        // }
        const body = req.body;

        // Đường dẫn tới file Python
        const pythonFilePath = path.resolve(__dirname, '../../predictor/final.py');

        // Tạo command để chạy script Python
        const pythonCommand = `python ${pythonFilePath} --age ${body.age} --gpa ${body.gpa} --domain "${body.domain}" --projects "${body.projects}" --python ${body.python} --sql ${body.sql} --java ${body.java}`;

        // Chạy lệnh Python
        exec(pythonCommand, (error, stdout, stderr) => {
            if (error) {
                // console.error(`Error: ${error.message}`);
                return res.status(500).json({ message: 'Python script error', error: error.message });
            }
            if (stderr) {
                // console.error(`Stderr: ${stderr}`);
                return res.status(500).json({ message: 'Python script stderr', error: stderr });
            }
            // console.log(`Output: ${stdout}`);
            return res.status(200).json({ message: 'Predict career success', data: stdout });
        });
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message
        });
    }
};

module.exports = {
    searchJobs,
    findCompanyByName,
    predictCareer
};
