<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210517093558 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE category (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(255) NOT NULL)');
        $this->addSql('DROP INDEX IDX_81398E09A76ED395');
        $this->addSql('CREATE TEMPORARY TABLE __temp__customer AS SELECT id, user_id, first_name, last_name, email, company FROM customer');
        $this->addSql('DROP TABLE customer');
        $this->addSql('CREATE TABLE customer (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER DEFAULT NULL, first_name VARCHAR(255) NOT NULL COLLATE BINARY, last_name VARCHAR(255) NOT NULL COLLATE BINARY, email VARCHAR(255) NOT NULL COLLATE BINARY, company VARCHAR(255) DEFAULT NULL COLLATE BINARY, CONSTRAINT FK_81398E09A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO customer (id, user_id, first_name, last_name, email, company) SELECT id, user_id, first_name, last_name, email, company FROM __temp__customer');
        $this->addSql('DROP TABLE __temp__customer');
        $this->addSql('CREATE INDEX IDX_81398E09A76ED395 ON customer (user_id)');
        $this->addSql('DROP INDEX IDX_906517449395C3F3');
        $this->addSql('CREATE TEMPORARY TABLE __temp__invoice AS SELECT id, customer_id, amount, sent_at, status, chrono FROM invoice');
        $this->addSql('DROP TABLE invoice');
        $this->addSql('CREATE TABLE invoice (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, customer_id INTEGER NOT NULL, amount DOUBLE PRECISION NOT NULL, sent_at DATETIME NOT NULL, status VARCHAR(255) NOT NULL COLLATE BINARY, chrono INTEGER NOT NULL, CONSTRAINT FK_906517449395C3F3 FOREIGN KEY (customer_id) REFERENCES customer (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO invoice (id, customer_id, amount, sent_at, status, chrono) SELECT id, customer_id, amount, sent_at, status, chrono FROM __temp__invoice');
        $this->addSql('DROP TABLE __temp__invoice');
        $this->addSql('CREATE INDEX IDX_906517449395C3F3 ON invoice (customer_id)');
        $this->addSql('CREATE TEMPORARY TABLE __temp__post AS SELECT id, title, slug, content, created_at, updated_at FROM post');
        $this->addSql('DROP TABLE post');
        $this->addSql('CREATE TABLE post (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, category_id INTEGER DEFAULT NULL, title VARCHAR(255) NOT NULL COLLATE BINARY, slug VARCHAR(255) NOT NULL COLLATE BINARY, content CLOB NOT NULL COLLATE BINARY, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, CONSTRAINT FK_5A8A6C8D12469DE2 FOREIGN KEY (category_id) REFERENCES category (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO post (id, title, slug, content, created_at, updated_at) SELECT id, title, slug, content, created_at, updated_at FROM __temp__post');
        $this->addSql('DROP TABLE __temp__post');
        $this->addSql('CREATE INDEX IDX_5A8A6C8D12469DE2 ON post (category_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP INDEX IDX_81398E09A76ED395');
        $this->addSql('CREATE TEMPORARY TABLE __temp__customer AS SELECT id, user_id, first_name, last_name, email, company FROM customer');
        $this->addSql('DROP TABLE customer');
        $this->addSql('CREATE TABLE customer (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER DEFAULT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, company VARCHAR(255) DEFAULT NULL)');
        $this->addSql('INSERT INTO customer (id, user_id, first_name, last_name, email, company) SELECT id, user_id, first_name, last_name, email, company FROM __temp__customer');
        $this->addSql('DROP TABLE __temp__customer');
        $this->addSql('CREATE INDEX IDX_81398E09A76ED395 ON customer (user_id)');
        $this->addSql('DROP INDEX IDX_906517449395C3F3');
        $this->addSql('CREATE TEMPORARY TABLE __temp__invoice AS SELECT id, customer_id, amount, sent_at, status, chrono FROM invoice');
        $this->addSql('DROP TABLE invoice');
        $this->addSql('CREATE TABLE invoice (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, customer_id INTEGER NOT NULL, amount DOUBLE PRECISION NOT NULL, sent_at DATETIME NOT NULL, status VARCHAR(255) NOT NULL, chrono INTEGER NOT NULL)');
        $this->addSql('INSERT INTO invoice (id, customer_id, amount, sent_at, status, chrono) SELECT id, customer_id, amount, sent_at, status, chrono FROM __temp__invoice');
        $this->addSql('DROP TABLE __temp__invoice');
        $this->addSql('CREATE INDEX IDX_906517449395C3F3 ON invoice (customer_id)');
        $this->addSql('DROP INDEX IDX_5A8A6C8D12469DE2');
        $this->addSql('CREATE TEMPORARY TABLE __temp__post AS SELECT id, title, slug, content, created_at, updated_at FROM post');
        $this->addSql('DROP TABLE post');
        $this->addSql('CREATE TABLE post (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title VARCHAR(255) NOT NULL, slug VARCHAR(255) NOT NULL, content CLOB NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL)');
        $this->addSql('INSERT INTO post (id, title, slug, content, created_at, updated_at) SELECT id, title, slug, content, created_at, updated_at FROM __temp__post');
        $this->addSql('DROP TABLE __temp__post');
    }
}
