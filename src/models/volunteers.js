import db from './db.js';

const addVolunteer = async (userId, projectId) => {
    const query = `
        INSERT INTO project_volunteer (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, project_id) DO NOTHING;
    `;

    const queryParams = [userId, projectId];

    await db.query(query, queryParams);
};

const removeVolunteer = async (userId, projectId) => {
    const query = `
        DELETE FROM project_volunteer
        WHERE user_id = $1 AND project_id = $2;
    `;

    const queryParams = [userId, projectId];

    await db.query(query, queryParams);
};

const getProjectsByUserId = async (userId) => {
    const query = `
        SELECT
            service_project.project_id,
            service_project.title,
            service_project.description,
            service_project.location,
            service_project.project_date,
            organization.name AS organization_name
        FROM project_volunteer
        JOIN service_project
            ON project_volunteer.project_id = service_project.project_id
        JOIN organization
            ON service_project.organization_id = organization.organization_id
        WHERE project_volunteer.user_id = $1
        ORDER BY service_project.project_date;
    `;

    const queryParams = [userId];

    const result = await db.query(query, queryParams);

    return result.rows;
};

const isUserVolunteer = async (userId, projectId) => {
    const query = `
        SELECT 1
        FROM project_volunteer
        WHERE user_id = $1 AND project_id = $2;
    `;

    const queryParams = [userId, projectId];

    const result = await db.query(query, queryParams);

    return result.rows.length > 0;
};

export {
    addVolunteer,
    removeVolunteer,
    getProjectsByUserId,
    isUserVolunteer
};