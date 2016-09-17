class SpecificSkill < ActiveRecord::Base

	scope :sorted, lambda { order("specific_skills.category ASC") }

end
