class Badge < ActiveRecord::Base

	mount_uploader :image_url, ProjectImgUploader

	scope :sorted, lambda { order("badges.id ASC") }

end
