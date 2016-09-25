class Badge < ActiveRecord::Base

	scope :sorted, lambda { order("badges.id ASC") }

end
