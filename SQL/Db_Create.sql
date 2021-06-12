USE [master]

IF db_id('Docupet') IS NULL
	CREATE DATABASE [Docupet]
GO

USE [Docupet]
GO

DROP TABLE IF ExISTS [Pet]
DROP TABLE IF ExISTS [User]
DROP TABLE IF ExISTS [User_pets]
DROP TABLE IF ExISTS [Documents]
DROP TABLE IF ExISTS [Activity]
GO

CREATE TABLE [Pet] (
  [ID] Int,
  [Name] text,
  [Type] text,
  PRIMARY KEY ([ID])
);

CREATE TABLE [User] (
  [ID] Int,
  [Name] text,
  PRIMARY KEY ([ID])
);

CREATE TABLE [User_pets] (
  [Id] int,
  [userId] text,
  [petId] text,
  [name] text,
  [age] int,
  [species] text,
  [vetInfo] text,
  [Image] text,
  PRIMARY KEY ([Id])
);

CREATE TABLE [Documents] (
  [Id] int,
  [petId] text,
  [image] text,
  [description] text,
  [importance] int,
  [link] text,
  [vetInfo] text
);

CREATE INDEX [Key] ON  [Documents] ([Id]);

CREATE TABLE [Activity] (
  [Id] int,
  [petId] int,
  [time] int,
  [name] text
);

CREATE INDEX [Key] ON  [Activity] ([Id]);


