import express from 'express';

import { showHomePage } from './controllers/index.js';
import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm
} from './controllers/organizations.js';
import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    processVolunteer,
    processRemoveVolunteer,
    projectValidation
} from './controllers/projects.js';
import {
    showCategoriesPage,
    showNewCategoryForm,
    showEditCategoryForm,
    processNewCategoryForm,
    processEditCategoryForm,
    categoryValidation,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm
} from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    requireRole,
    showDashboard,
    showUsers
} from './controllers/users.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
router.post(
    '/new-organization',
    requireRole('admin'),
    organizationValidation,
    processNewOrganizationForm
);

router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get(
    '/volunteer/:id',
    requireLogin,
    processVolunteer
);

router.get(
    '/remove-volunteer/:id',
    requireLogin,
    processRemoveVolunteer
);
router.get('/new-project', requireRole('admin'), showNewProjectForm);

router.post(
    '/new-project',
    requireRole('admin'),
    projectValidation,
    processNewProjectForm
);

router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);

router.post(
    '/edit-project/:id',
    requireRole('admin'),
    projectValidation,
    processEditProjectForm
);

router.get('/categories', showCategoriesPage);
router.get('/new-category', requireRole('admin'), showNewCategoryForm);
router.post(
    '/new-category',
    requireRole('admin'),
    categoryValidation,
    processNewCategoryForm
);
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
router.post(
    '/edit-category/:id',
    requireRole('admin'),
    categoryValidation,
    processEditCategoryForm
);
router.get('/category/:id', showCategoryDetailsPage);
router.get(
    '/assign-categories/:projectId',
    requireRole('admin'),
    showAssignCategoriesForm
);
router.post(
    '/assign-categories/:projectId',
    requireRole('admin'),
    processAssignCategoriesForm
);

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

// Protected dashboard route
router.get('/dashboard', requireLogin, showDashboard);
router.get('/users', requireRole('admin', '/dashboard'), showUsers);

// error-handling routes
router.get('/test-error', testErrorPage);

// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);

// Route to display the edit organization form
router.get(
    '/edit-organization/:id',
    requireRole('admin'),
    showEditOrganizationForm
);

// Route to handle the edit organization form submission
router.post(
    '/edit-organization/:id',
    requireRole('admin'),
    organizationValidation,
    processEditOrganizationForm
);

export default router;