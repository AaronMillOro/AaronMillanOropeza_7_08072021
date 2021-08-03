-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema intranet_groupomania
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema intranet_groupomania
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `intranet_groupomania` DEFAULT CHARACTER SET utf8 ;
USE `intranet_groupomania` ;

-- -----------------------------------------------------
-- Table `intranet_groupomania`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `intranet_groupomania`.`Users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `is_admin` TINYINT(1) NOT NULL DEFAULT 0,
  `pseudo` VARCHAR(50) NULL DEFAULT NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `intranet_groupomania`.`Posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `intranet_groupomania`.`Posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` TEXT NOT NULL,
  `posted_at` DATETIME NOT NULL,
  `likes` INT NULL,
  `users_like` MEDIUMTEXT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  INDEX `fk_Posts_Users1_idx` (`user_id` ASC),
  CONSTRAINT `fk_Posts_Users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `intranet_groupomania`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intranet_groupomania`.`Comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `intranet_groupomania`.`Comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(255) NOT NULL,
  `posted_at` DATETIME NOT NULL,
  `post_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `post_id`, `user_id`),
  INDEX `fk_Comments_Posts1_idx` (`post_id` ASC),
  INDEX `fk_Comments_Users1_idx` (`user_id` ASC),
  CONSTRAINT `fk_Comments_Posts1`
    FOREIGN KEY (`post_id`)
    REFERENCES `intranet_groupomania`.`Posts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comments_Users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `intranet_groupomania`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
