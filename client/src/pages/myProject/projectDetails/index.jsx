import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Edit } from '../../../components/AllSvgs'
import { BackButton, ButtonTag, PTag } from '../../../components/designComponents/MicroComponents'
//icons
import { MdDelete } from 'react-icons/md'
import IsLoadingHOC from '../../../components/higherOrderLoader/IsLoadingHOC'
import { useDispatch } from 'react-redux'
import { deactiveRequirement, getprojectDetails, postProject, setProject } from '../../../store/project/slice'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { projectMsg } from '../../../components/common/ValidationConstants'
import MiniLoader from '../../../components/customLoader/MiniLoader'

const AddNewProject = ({ setLoading }) => {
    const navigation = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    // state states
    const projectProfile = useSelector(state => state.project)

    const { projectId } = location.state ?? false

    const [projectDetails, setProjectDetails] = useState(null)
    const [isMiniLoading, setIsMiniLoading] = useState(false)

    useEffect(() => {
        dispatch(getprojectDetails(projectId))
    }, [])

    useEffect(() => {
        switch (projectProfile.status) {
            case 'succeed':
                switch (projectProfile.type) {
                    case 'GET_PROJECT_DETAILS':
                        setProjectDetails(projectProfile?.projectDetails)
                        setIsMiniLoading(false)
                        setLoading(false)
                        dispatch(setProject())
                        break;
                    case 'DEL_REQUIREMENT':
                        toast.success(projectMsg?.requirementDeleted)
                        setTimeout(() => {
                            dispatch(getprojectDetails(projectId))
                        }, 1000);
                        dispatch(setProject())
                        break;
                    default:
                        break;
                }
                break;

            default:
                break;
        }
    }, [projectProfile])

    Date.prototype.toShortFormat = function () {
        let monthNames = ["Jan", "Feb", "Mar", "Apr",
            "May", "Jun", "Jul", "Aug",
            "Sep", "Oct", "Nov", "Dec"];

        let day = this.getDate();

        let monthIndex = this.getMonth();
        let monthName = monthNames[monthIndex];

        let year = this.getFullYear();

        return `${day} ${monthName} ${year}`;
    }

    const DeleteSocialProfileAlert = requirementId => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You won't be able to undo this!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(result => {
            if (result.isConfirmed) {
                setIsMiniLoading(true)
                dispatch(deactiveRequirement({ projectId, requirementId }))
            }
        })
    }

    if (projectId) {
        return (
            <>
                <div className='container'>
                    <div className=''>
                        <BackButton
                            title={'Project Details'}
                            onClick={() => {
                                navigation('/dashboard/projects')
                            }}
                        />
                    </div>
                    <div className='row max-w-625 mx-auto mt-4'>
                        <div className='mb-5'>
                            <div className='d-flex justify-content-between align-items-center pb-3 border-bottom'>
                                <div>
                                    <PTag classes={'text-dark-blue fw-bold fn-14'} texts={projectDetails?.projectName} />
                                    <PTag texts={'Expiry date - 27 Oct 2021'} />
                                </div>
                                <Link to='/dashboard/addproject' state={{ projectId }}>
                                    <Edit width={24} />
                                </Link>
                            </div>
                            <div className='d-flex justify-content-between mt-3'>
                                <div className='max-w-120 w-100'>
                                    <PTag texts={'Project Type'} />
                                    <PTag classes={'text-dark-blue semibold fn-16 text-capitalize'} texts={projectDetails?.projectTypeCode} />
                                </div>
                                <div className='max-w-120 w-100'>
                                    <PTag texts={'Locations'} />
                                    {projectDetails?.projectLocations?.map((tag, i) => <span className='text-dark-blue semibold fn-16 text-capitalize' key={i}>
                                        {i > 0 && ", "}
                                        <span>{tag}</span>
                                    </span>)}
                                </div>
                            </div>
                            <div className='d-flex justify-content-between mt-3'>
                                <div className='max-w-120 w-100'>
                                    <PTag texts={'Start Date'} />
                                    <PTag
                                        classes={'text-dark-blue semibold fn-16 text-capitalize'}
                                        texts={new Date(projectDetails?.projectDurationFrom).toShortFormat()}
                                    />
                                </div>
                                <div className='max-w-120 w-100'>
                                    <PTag texts={'End date'} />
                                    <PTag classes={'text-dark-blue semibold fn-16 text-capitalize'}
                                        texts={new Date(projectDetails?.projectDurationTo).toShortFormat()}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='d-flex align-items-center justify-content-between mb-3'>
                                <PTag classes={''} texts={'Requirements '} />
                                <Link
                                    to='/dashboard/addrequirement'
                                    state={{ projectId, addMore: true }}
                                    className={'btn btn-extra-lite-green semibold'}>+ Add More</Link>
                            </div>
                            <div className='col-12 max-w-625'>
                                {isMiniLoading ? <MiniLoader className={'w-100 h-100'} /> : projectDetails?.requirements?.map((data, index) => <div key={index} className='card p-3 rounded-10 mb-4'>
                                    <div className='d-flex justify-content-between border-bottom pb-3'>
                                        <div className=''>
                                            <PTag
                                                classes={'text-dark-blue text-capitalize fw-bold fn-16'}
                                                texts={data.profileType}
                                            />
                                            <PTag classes={''} texts={'Expiry Date - 27 Oct 2021'} />
                                        </div>
                                        <div className='d-flex justify-content-center align-items-start'>
                                            <Link to='/dashboard/addrequirement' className='mx-2' state={{ projectId, requirementId: data?.requirementId, addMore: false }}>
                                                <Edit width={24} />
                                            </Link>
                                            <div className='mx-2'
                                                onClick={() => {
                                                    DeleteSocialProfileAlert(data?.requirementId)
                                                }}>
                                                <MdDelete className={'Md-Delete'} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='my-3'>
                                        <PTag classes={''} texts={'Genres'} />
                                        {data?.genres?.map((genre, i) => (
                                            <span
                                                className='text-dark-blue semibold fn-16 text-capitalize'
                                                key={i}
                                            >
                                                {i > 0 && ', '}
                                                <span>{genre}</span>
                                            </span>
                                        ))}
                                    </div>
                                    <div className='my-4'>
                                        <PTag className={''} texts={'Budget'} />
                                        <div className='d-flex justify-content-between my-1 align-items-center'>
                                            <PTag
                                                classes={'text-dark-blue bold fn-16'}
                                                texts={`Minimum - ₹${data?.minBudget.toLocaleString('en-IN')}`}
                                            />
                                            <PTag
                                                classes={'text-dark-blue bold fn-16 mt-0'}
                                                texts={`Maximum - ₹${data?.maxBudget.toLocaleString('en-IN')}`}
                                            />
                                        </div>
                                    </div>
                                    {/* temparory location */}
                                    <div className='max-w-120 w-100'>
                                        <PTag texts={'Locations'} />
                                        {projectDetails?.projectLocations?.map((tag, i) => <span className='text-dark-blue semibold fn-16 text-capitalize' key={i}>
                                            {i > 0 && ", "}
                                            <span>{tag}</span>
                                        </span>)}
                                    </div>
                                    {data?.location && <div className=''>
                                        <PTag className={''} texts={'Location'} />
                                        <PTag
                                            classes={'text-dark-blue fn-16 bold'}
                                            texts={'Laculis, shimla'}
                                        />
                                    </div>}

                                </div>)}
                            </div>
                        </div>
                        <Link to='/dashboard/projects' className="btn btn-orange semibold fn-12 rounded white-space-nowrap w-auto mx-auto">Continue</Link>
                    </div>
                </div>
            </>
        )
    }

    return <div className='my-4 text-center'>
        <h2 className='mb-3'>Please create Project first</h2>
        <Link to="/dashboard/projects" className='btn btn btn-dark-blue semibold fn-12 rounded' >Create Project</Link>
    </div>
}
export default IsLoadingHOC(AddNewProject)
