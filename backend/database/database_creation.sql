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
  `pseudo` VARCHAR(50) NULL DEFAULT NULL,
  `avatar` VARCHAR(255) NULL DEFAULT NULL,
  `position` VARCHAR(5) NULL DEFAULT 'user',
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
  `likes` INT NULL,
  `dislikes` INT NULL,
  `postedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intranet_groupomania`.`Users_Posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `intranet_groupomania`.`Users_Posts` (
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `post_id`),
  INDEX `fk_Users_has_Posts_Posts1_idx` (`post_id` ASC),
  INDEX `fk_Users_has_Posts_Users_idx` (`user_id` ASC),
  CONSTRAINT `fk_Users_has_Posts_Users`
    FOREIGN KEY (`user_id`)
    REFERENCES `intranet_groupomania`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Users_has_Posts_Posts1`
    FOREIGN KEY (`post_id`)
    REFERENCES `intranet_groupomania`.`Posts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `intranet_groupomania`.`Comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `intranet_groupomania`.`Comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(255) NOT NULL,
  `postedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intranet_groupomania`.`Comments_Posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `intranet_groupomania`.`Comments_Posts` (
  `comment_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  PRIMARY KEY (`comment_id`, `post_id`),
  INDEX `fk_Comments_has_Posts_Posts1_idx` (`post_id` ASC),
  INDEX `fk_Comments_has_Posts_Comments1_idx` (`comment_id` ASC),
  CONSTRAINT `fk_Comments_has_Posts_Comments1`
    FOREIGN KEY (`comment_id`)
    REFERENCES `intranet_groupomania`.`Comments` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comments_has_Posts_Posts1`
    FOREIGN KEY (`post_id`)
    REFERENCES `intranet_groupomania`.`Posts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intranet_groupomania`.`Users_Comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `intranet_groupomania`.`Users_Comments` (
  `users_id` INT NOT NULL,
  `comment_id` INT NOT NULL,
  PRIMARY KEY (`users_id`, `comment_id`),
  INDEX `fk_Users_has_Comments_Comments1_idx` (`comment_id` ASC),
  INDEX `fk_Users_has_Comments_Users1_idx` (`users_id` ASC),
  CONSTRAINT `fk_Users_has_Comments_Users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `intranet_groupomania`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Users_has_Comments_Comments1`
    FOREIGN KEY (`comment_id`)
    REFERENCES `intranet_groupomania`.`Comments` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
