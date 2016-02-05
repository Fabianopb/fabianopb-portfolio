class ChangeSkillsName < ActiveRecord::Migration
  
  def up
    rename_column("skills", "skill", "skill_name")
  end
  
  def down
    rename_column("skills", "skill_name", "skill")
  end
  
end
