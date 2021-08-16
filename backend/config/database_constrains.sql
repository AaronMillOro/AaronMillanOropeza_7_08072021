# after migrations with sequelize-cli set the FK configuration as follows

ALTER TABLE `intranet_groupomania`.`Posts` 
DROP FOREIGN KEY `Posts_ibfk_1`;
ALTER TABLE `intranet_groupomania`.`Posts` 
ADD CONSTRAINT `Posts_ibfk_1`
  FOREIGN KEY (`userId`)
  REFERENCES `intranet_groupomania`.`Users` (`id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;


ALTER TABLE `intranet_groupomania`.`Opinions` 
DROP FOREIGN KEY `Opinions_ibfk_1`;
ALTER TABLE `intranet_groupomania`.`Opinions` 
ADD CONSTRAINT `Opinions_ibfk_1`
  FOREIGN KEY (`userId`)
  REFERENCES `intranet_groupomania`.`Users` (`id`)
  ON DELETE CASCADE
  ON UPDATE RESTRICT;


ALTER TABLE `intranet_groupomania`.`Opinions` 
DROP FOREIGN KEY `Opinions_ibfk_2`;
ALTER TABLE `intranet_groupomania`.`Opinions` 
ADD CONSTRAINT `Opinions_ibfk_2`
  FOREIGN KEY (`postId`)
  REFERENCES `intranet_groupomania`.`Posts` (`id`)
  ON DELETE CASCADE
  ON UPDATE RESTRICT;
