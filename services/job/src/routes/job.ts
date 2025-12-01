import express from 'express'
import uploadFile from '../middlewares/multer.js'
import { isAuth } from '../middlewares/auth.js'
import { createCompany, deleteCompany, createJob, updateJob, getAllCompany, getCompanyDetails, getAllActiveJobs, getSingleJob, getAllApplicationForJob, updateApplication } from '../controllers/job.js'

const router = express.Router()

router.post('/company/new', isAuth, uploadFile, createCompany)
router.delete('/company/:companyId', isAuth, deleteCompany)

router.post('/new', isAuth, createJob)
router.put('/:jobId', isAuth, updateJob)
router.get('/company/all', getAllCompany)
router.get('/company/:id', getCompanyDetails)
router.get('/all', getAllActiveJobs)
router.get('/:jobId', getSingleJob)
router.get('/application/:jobId', isAuth, getAllApplicationForJob)
router.put('/application/update/:id', isAuth, updateApplication)

export default router