-- ============================================================
-- NEMENIN — Database Schema
-- Relational database structure for the companion platform
-- ============================================================

-- Drop tables if they exist (for fresh installs)
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS companions;
DROP TABLE IF EXISTS users;

-- ============================================================
-- 1. USERS TABLE
-- Stores all platform users (regular users, companions, admins)
-- ============================================================
CREATE TABLE users (
    id                     BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name                   VARCHAR(255) NOT NULL,
    email                  VARCHAR(255) NOT NULL UNIQUE,
    password               VARCHAR(255) NOT NULL,
    phone                  VARCHAR(20) NULL,
    address                TEXT NULL,
    ktp_number             VARCHAR(20) NULL UNIQUE COMMENT 'Encrypted KTP number for identity verification',
    avatar_path            VARCHAR(500) NULL COMMENT 'Path to AI-cartoonized avatar image',
    real_photo_path        VARCHAR(500) NULL COMMENT 'Path to real photo (private, admin-only access)',
    role                   ENUM('user', 'companion', 'admin') NOT NULL DEFAULT 'user',
    tier                   ENUM('regular', 'premium') NOT NULL DEFAULT 'regular',
    subscription_expires_at DATETIME NULL COMMENT 'NULL for regular tier, expiration date for premium',
    email_verified_at      DATETIME NULL,
    created_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_users_role (role),
    INDEX idx_users_tier (tier),
    INDEX idx_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 2. COMPANIONS TABLE
-- Extended profile for users with "companion" role
-- ============================================================
CREATE TABLE companions (
    id                     BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id                BIGINT UNSIGNED NOT NULL,
    bio                    TEXT NULL COMMENT 'Short biography visible to users',
    status                 ENUM('pending', 'verified', 'suspended') NOT NULL DEFAULT 'pending',
    hourly_rate            DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT 'Rate in IDR per hour',
    is_online              BOOLEAN NOT NULL DEFAULT FALSE,
    specializations        JSON NULL COMMENT 'Array of specialization tags, e.g. ["mendengarkan", "menemani"]',
    total_sessions         INT UNSIGNED DEFAULT 0,
    average_rating         DECIMAL(3, 2) DEFAULT 0.00,
    created_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_companions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE INDEX idx_companions_user (user_id),
    INDEX idx_companions_status (status),
    INDEX idx_companions_online (is_online)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 3. SESSIONS TABLE
-- Tracks all companion sessions (online chat or offline meetup)
-- ============================================================
CREATE TABLE sessions (
    id                     BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id                BIGINT UNSIGNED NOT NULL COMMENT 'The user who booked the session',
    companion_id           BIGINT UNSIGNED NOT NULL COMMENT 'The companion providing the session',
    session_type           ENUM('online', 'offline') NOT NULL DEFAULT 'online',
    status                 ENUM('pending', 'confirmed', 'active', 'completed', 'canceled') NOT NULL DEFAULT 'pending',
    scheduled_at           DATETIME NOT NULL COMMENT 'When the session is scheduled to start',
    duration_minutes       INT UNSIGNED NOT NULL DEFAULT 60,
    total_price            DECIMAL(12, 2) NOT NULL DEFAULT 0.00 COMMENT 'Total price in IDR',
    notes                  TEXT NULL COMMENT 'Optional notes from user',
    meeting_location       VARCHAR(500) NULL COMMENT 'For offline sessions only',
    canceled_by            ENUM('user', 'companion', 'system') NULL,
    canceled_reason        TEXT NULL,
    completed_at           DATETIME NULL,
    created_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_sessions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_sessions_companion FOREIGN KEY (companion_id) REFERENCES companions(id) ON DELETE CASCADE,
    INDEX idx_sessions_user (user_id),
    INDEX idx_sessions_companion (companion_id),
    INDEX idx_sessions_status (status),
    INDEX idx_sessions_scheduled (scheduled_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 4. PAYMENTS TABLE
-- Tracks all financial transactions (subscriptions & sessions)
-- ============================================================
CREATE TABLE payments (
    id                     BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id                BIGINT UNSIGNED NOT NULL,
    amount                 DECIMAL(12, 2) NOT NULL COMMENT 'Amount in IDR',
    payment_method         VARCHAR(50) NOT NULL COMMENT 'e.g. bank_transfer, e_wallet, credit_card',
    status                 ENUM('pending', 'processing', 'completed', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
    related_type           ENUM('subscription', 'session') NOT NULL COMMENT 'What this payment is for',
    related_id             BIGINT UNSIGNED NULL COMMENT 'ID of related session (if session payment)',
    transaction_id         VARCHAR(255) NULL COMMENT 'External payment gateway transaction ID',
    payment_proof          VARCHAR(500) NULL COMMENT 'Path to payment proof image',
    notes                  TEXT NULL,
    paid_at                DATETIME NULL,
    created_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_payments_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_payments_user (user_id),
    INDEX idx_payments_status (status),
    INDEX idx_payments_related (related_type, related_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- SAMPLE DATA (for demonstration / development)
-- ============================================================

-- Admin user
INSERT INTO users (name, email, password, phone, role, tier) VALUES
('Admin Nemenin', 'admin@nemenin.id', '$2y$10$hashedpassword', '081200000000', 'admin', 'premium');

-- Sample companion users
INSERT INTO users (name, email, password, phone, role, tier, ktp_number) VALUES
('Andi Pratama', 'andi@nemenin.id', '$2y$10$hashedpassword', '081234567001', 'companion', 'premium', '3201010101010001'),
('Sari Dewi', 'sari@nemenin.id', '$2y$10$hashedpassword', '081234567002', 'companion', 'premium', '3201010101010002'),
('Rizki Amanah', 'rizki@nemenin.id', '$2y$10$hashedpassword', '081234567003', 'companion', 'premium', '3201010101010003'),
('Maya Lestari', 'maya@nemenin.id', '$2y$10$hashedpassword', '081234567004', 'companion', 'premium', '3201010101010004'),
('Budi Santoso', 'budi@nemenin.id', '$2y$10$hashedpassword', '081234567005', 'companion', 'premium', '3201010101010005'),
('Dina Fitriani', 'dina@nemenin.id', '$2y$10$hashedpassword', '081234567006', 'companion', 'premium', '3201010101010006');

-- Companion profiles
INSERT INTO companions (user_id, bio, status, hourly_rate, is_online, specializations, total_sessions, average_rating) VALUES
(2, 'Pendengar yang baik dan berempati. Siap menemani kamu dalam suasana apa pun.', 'verified', 50000.00, TRUE, '["mendengarkan", "motivasi"]', 128, 4.85),
(3, 'Psikologi lulusan UI. Passionate di bidang kesehatan mental dan empati.', 'verified', 75000.00, TRUE, '["konseling ringan", "empati"]', 96, 4.92),
(4, 'Suka ngobrol dan menemani. Tempatku adalah tempat ceritamu.', 'verified', 45000.00, FALSE, '["teman ngobrol", "curhat"]', 74, 4.78),
(5, 'Aktif di komunitas volunteer. Percaya setiap orang berhak didengar.', 'verified', 60000.00, TRUE, '["volunteer", "mendengarkan"]', 52, 4.65),
(6, 'Pendamping offline berpengalaman. Siap menemani di kafe atau taman.', 'verified', 55000.00, FALSE, '["offline", "menemani"]', 43, 4.70),
(7, 'Lulusan konseling. Menyediakan ruang aman tanpa penghakiman.', 'verified', 80000.00, TRUE, '["konseling", "empati", "ruang aman"]', 187, 4.95);
