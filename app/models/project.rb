class Project < ActiveRecord::Base
    
    mount_uploader :thumbnail, ProjectImgUploader
    mount_uploader :image1, ProjectImgUploader
    mount_uploader :image2, ProjectImgUploader
    
    scope :sorted, lambda { order("projects.id ASC") }
    
end
