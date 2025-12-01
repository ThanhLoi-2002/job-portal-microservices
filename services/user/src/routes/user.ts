import express from 'express'
import uploadFile from '../middlewares/multer.js'
import { isAuth } from '../middlewares/auth.js'
import { addSkillToUser, deleteSkillFromUser, getUserProfile, myProfile, updateProfilePic, updateResume, updateUserProfile, appyForJob, getAllApplications } from '../controllers/user.js'

const router = express.Router()

router.get('/me', isAuth, myProfile)
router.get('/:userId', isAuth, getUserProfile)

router.put('/update/:userId', isAuth, updateUserProfile)
router.put('/update/pic', isAuth, updateProfilePic)
router.put('/update/resume', isAuth, updateResume)

router.post('/skill/add', isAuth, addSkillToUser)
router.delete('/skill/delete', isAuth, deleteSkillFromUser)

router.post('/apply/:jobId', isAuth, appyForJob)
router.get('/application/all', isAuth, appyForJob, getAllApplications)

export default router