# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160925115734) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admin_users", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.string "password_digest"
  end

  create_table "badges", force: :cascade do |t|
    t.string   "name"
    t.string   "image_url"
    t.string   "link"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "basic_infos", force: :cascade do |t|
    t.string "header"
    t.text   "hero"
    t.string "caption"
    t.string "quote"
    t.text   "story"
  end

  create_table "projects", force: :cascade do |t|
    t.string  "title"
    t.string  "caption"
    t.text    "abstract"
    t.text    "text"
    t.text    "facts"
    t.string  "image1"
    t.string  "image2"
    t.string  "thumbnail"
    t.string  "video"
    t.string  "duration"
    t.boolean "visibility", default: false
  end

  create_table "skills", force: :cascade do |t|
    t.string  "skill_name"
    t.integer "level"
    t.boolean "visibility", default: false
  end

  create_table "specific_skills", force: :cascade do |t|
    t.string   "category"
    t.string   "name"
    t.integer  "size"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
