import { ATag, PTag } from '../designComponents/MicroComponents'

export const ProfileInput = ({ title, detail }) => {
    return (
        <div className='input-data mb-3'>
            <PTag classes={'text-gray mb-1'} texts={title} />
            <PTag classes={'text-dark-blue'} texts={detail} />
        </div>
    )
}

export const SocialImageTitle = ({ tagClass, icon, label }) => {
    return (
        <div
            className={`d-flex align-items-center ${tagClass}`}
        >
            <div className='w-24'>{icon}</div>
            <PTag classes={'text-dark ms-2'} texts={label} />
        </div>
    )
}
