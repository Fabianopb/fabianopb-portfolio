class CreateBasicInfo < ActiveRecord::Migration
  
  def up
    create_table :basic_infos do |t|
      t.string 'header'
      t.text 'hero'
      t.string 'caption'
      t.string 'quote'
      t.text 'story'
    end
  end
  
  def down
    drop_table :basic_infos
  end
  
end
