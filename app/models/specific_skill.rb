class SpecificSkill < ActiveRecord::Base

	scope :sorted, lambda { order("specific_skills.category ASC") }
	scope :filter_category, ->(category) { where(["category = ?", category]) }

end
