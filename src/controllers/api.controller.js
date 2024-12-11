const axios = require('axios');

// const baseUrl = 'https://ms.vietnamworks.com/job-search/v1.0/search';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const searchJobs = async (req, res, next) => {
    try {
        const apiUrl = `https://ms.vietnamworks.com/job-search/v1.0/search`;

        // const requestData = req.body;
        const keyword = req.body.keyword
        console.log(keyword);

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
        const selectedKeys = ['jobTitle', 'jobUrl', 'companyName', 'jobDescription', 'jobRequirement', 'skills', 'benefits', 'workingLocations', 'address', 'jobLevel', 'prettySalary', 'rangeAge', 'salaryCurrency'];

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

module.exports = {
    searchJobs
};
