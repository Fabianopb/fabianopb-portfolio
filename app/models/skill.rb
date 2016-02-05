class Skill < ActiveRecord::Base
    
    scope :sorted, lambda { order("skills.id ASC") }
    
end
