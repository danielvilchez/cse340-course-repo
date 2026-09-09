-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- ========================================
-- Service Project Table
-- ========================================
CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL REFERENCES organization(organization_id),
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(100),
    project_date DATE
);

-- ========================================
-- Insert sample data: Service Projects
-- ========================================
INSERT INTO service_project (
    organization_id,
    title,
    description,
    location,
    project_date
)
VALUES
(1, 'Community Center Renovation', 'Renovate and improve a local community center.', 'Austin', '2026-09-15'),
(1, 'Neighborhood Park Cleanup', 'Clean and restore a neighborhood park for local families.', 'Dallas', '2026-09-20'),
(1, 'Affordable Housing Project', 'Help improve housing conditions for families in need.', 'Houston', '2026-09-25'),
(1, 'Community Playground Build', 'Build a safe playground for children in the community.', 'San Antonio', '2026-10-03'),
(1, 'Senior Center Improvement', 'Improve facilities and common areas at a local senior center.', 'Fort Worth', '2026-10-10'),

(2, 'Urban Garden Project', 'Create a community garden and teach sustainable farming.', 'Seattle', '2026-09-18'),
(2, 'School Garden Program', 'Build a small garden at a local school for educational purposes.', 'Tacoma', '2026-09-22'),
(2, 'Food Sustainability Workshop', 'Teach community members about sustainable food production.', 'Olympia', '2026-09-28'),
(2, 'Community Farm Day', 'Organize a volunteer day to maintain the community farm.', 'Everett', '2026-10-05'),
(2, 'Local Food Drive', 'Collect and distribute fresh produce to families in need.', 'Spokane', '2026-10-12'),

(3, 'Community Food Drive', 'Collect food donations and distribute them to local families.', 'Portland', '2026-09-17'),
(3, 'Volunteer Park Cleanup', 'Organize volunteers to clean a public park.', 'Salem', '2026-09-24'),
(3, 'Clothing Donation Event', 'Collect clothing donations for people in need.', 'Eugene', '2026-10-01'),
(3, 'School Supply Drive', 'Collect school supplies for children in local schools.', 'Gresham', '2026-10-08'),
(3, 'Community Service Day', 'Coordinate volunteers for several community service activities.', 'Beaverton', '2026-10-15');