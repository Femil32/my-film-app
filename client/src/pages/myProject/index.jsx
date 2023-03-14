import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RightChevron } from '../../components/AllSvgs'
import { BackButton, ButtonTag, PTag } from '../../components/designComponents/MicroComponents'
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'
import { getAllProject } from '../../store/project/slice'
import { toast } from 'react-toastify'
import MiniLoader from '../../components/customLoader/MiniLoader'
import { CustomPagination } from '../../components/common/pagination'

const MyProject = ({ setLoading }) => {
    // hooks
    const projectProfile = useSelector(state => state.project)

    const navigation = useNavigate()
    const dispatch = useDispatch()

    // states
    const [allProjects, setAllProjects] = useState({})
    const [currrentPage, setCurrrentPage] = useState(0)
    const [isMiniLoading, setIsMiniLoading] = useState(false)

    useEffect(() => {
        setIsMiniLoading(true)
        Promise.all([dispatch(getAllProject(currrentPage))]).finally(() => {
            sessionStorage.clear()
            setLoading(false)
            setIsMiniLoading(false)
        })
    }, [currrentPage])

    useEffect(() => {
        switch (projectProfile.status) {
            case 'failed':
                toast.error(projectProfile.error)
                break;
            case 'succeed':
                switch (projectProfile.type) {
                    case 'GET_ALL_PROJECT':
                        setAllProjects(projectProfile?.allProjects)
                        break;
                    default:
                        break;
                }
                break;

            default:
                break;
        }
    }, [projectProfile])

    return (
        <div className="container h-100">
            <div className="d-flex justify-content-between">
                <BackButton
                    title={'All Projects'}
                    onClick={() => {
                        navigation('/dashboard')
                    }}
                />
                <div className="d-flex">
                    <ButtonTag classes={'btn btn-dark-blue semibold fn-12 rounded'}
                        onClick={() => { navigation('/dashboard/addproject') }}
                        value={'Add New Projects'} />
                </div>
            </div>
            <div className="row mt-4">
                {isMiniLoading ? <MiniLoader className={'w-100 h-100'} /> : allProjects?.projects?.length > 0 ? allProjects?.projects?.map((project, i) =>
                    <div className="col-lg-6 mb-4" key={i}>
                        <div className="card rounded-10 p-3">
                            <div className="d-flex align-items-center justify-content-between">
                                <PTag classes={'text-dark-blue fw-bold'} texts={project.projectName} />
                                <div className="">
                                    <Link to={`/dashboard/projectdetails/`} state={{ projectId: project?.projectId }} className={"d-flex align-items-center justify-content-between text-navy-blue semibold pointer"}>
                                        <PTag classes={'me-2'} texts={'View'} />
                                        <RightChevron width={'10'} />
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <PTag texts={`Created On - ${new Date(project.insertedDate).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })}`} />
                            </div>
                            {project?.isActive ?
                                <div className='mt-3'>
                                    <ButtonTag classes={'btn-green semibold fn-12 rounded'} value={'Post Requirements'} />
                                </div>
                                :
                                <div className='mt-3'>
                                    Status <span className={`semibold fn-15 rounded`}>{project.projectStatus}</span>
                                </div>}
                        </div>
                    </div>
                ) : (<>
                    <PTag
                        classes={'text-gray d-flex align-items-center justify-content-center data-h'}
                        texts={'No data found'}

                    />
                </>)}
                {allProjects.totalPages > 1 &&
                    <CustomPagination
                        pageCount={projectProfile?.allProjects?.totalPages}
                        onPageChange={(page) => {
                            setCurrrentPage(page.selected)
                        }}
                    />
                }
            </div>
        </div>
    )
}


export default IsLoadingHOC(MyProject)