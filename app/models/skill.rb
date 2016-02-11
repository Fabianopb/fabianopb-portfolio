class Skill < ActiveRecord::Base
    
    scope :sorted, lambda { order("skills.level DESC", "skills.skill_name ASC") }
    
end
