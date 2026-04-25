-- =============================================================
-- PetAdopt Database Schema Design
-- Purpose: Secure, role-based pet adoption system
-- =============================================================

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS pet_adopt;
USE pet_adopt;

-- 1. USERS TABLE
-- Stores credentials and profile info. 
-- Phone and tokens should be handled via AES encryption in the app layer.
CREATE TABLE IF NOT EXISTS USERS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(128) NOT NULL, -- SHA512 hash
    salt VARCHAR(255) NOT NULL,          -- Base64 salt
    role ENUM('Admin', 'Shelter', 'Adopter') NOT NULL,
    account_status ENUM('Pending', 'Approved', 'Rejected', 'Suspended') DEFAULT 'Pending',
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone TEXT,                          -- Encrypted data
    city VARCHAR(100),
    country VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. PETS TABLE
CREATE TABLE IF NOT EXISTS PETS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    species ENUM('Dog', 'Cat', 'Bird', 'Rabbit') NOT NULL,
    breed VARCHAR(100),
    age INT,
    age_unit ENUM('Years', 'Months'),
    gender ENUM('Male', 'Female'),
    health_status TEXT,                  -- CSV list
    description TEXT,
    location VARCHAR(255),
    image_urls TEXT,                     -- CSV of URLs
    status ENUM('Draft', 'PendingReview', 'Approved', 'Adopted', 'Rejected') DEFAULT 'PendingReview',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_pet_owner FOREIGN KEY (owner_id) REFERENCES USERS(id) ON DELETE CASCADE
);

-- 3. ADOPTION_REQUESTS TABLE
CREATE TABLE IF NOT EXISTS ADOPTION_REQUESTS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pet_id INT NOT NULL,
    adopter_id INT NOT NULL,
    message TEXT,
    why_this_pet TEXT,
    status ENUM('Pending', 'Accepted', 'Rejected') DEFAULT 'Pending',
    rejection_reason TEXT,
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    responded_at DATETIME NULL,
    CONSTRAINT fk_req_pet FOREIGN KEY (pet_id) REFERENCES PETS(id) ON DELETE CASCADE,
    CONSTRAINT fk_req_adopter FOREIGN KEY (adopter_id) REFERENCES USERS(id) ON DELETE CASCADE
);

-- 4. REFRESH_TOKENS TABLE
CREATE TABLE IF NOT EXISTS REFRESH_TOKENS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token TEXT NOT NULL,                -- AES Encrypted
    token_hash VARCHAR(64) NOT NULL,    -- SHA256 for searching
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires DATETIME NOT NULL,
    revoked DATETIME NULL,
    CONSTRAINT fk_token_user FOREIGN KEY (user_id) REFERENCES USERS(id) ON DELETE CASCADE,
    INDEX (token_hash)
);

-- 5. FAVORITES TABLE
CREATE TABLE IF NOT EXISTS FAVORITES (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    pet_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_fav_user FOREIGN KEY (user_id) REFERENCES USERS(id) ON DELETE CASCADE,
    CONSTRAINT fk_fav_pet FOREIGN KEY (pet_id) REFERENCES PETS(id) ON DELETE CASCADE,
    UNIQUE KEY (user_id, pet_id)
);

-- 6. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS REVIEWS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    adopter_id INT NOT NULL,
    pet_id INT NOT NULL,
    rating TINYINT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_rev_adopter FOREIGN KEY (adopter_id) REFERENCES USERS(id) ON DELETE CASCADE,
    CONSTRAINT fk_rev_pet FOREIGN KEY (pet_id) REFERENCES PETS(id) ON DELETE CASCADE
);