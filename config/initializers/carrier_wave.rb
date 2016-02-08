CarrierWave.configure do |config|
    
    if Rails.env.production?
        config.fog_credentials = {
            :provider               => 'AWS',
            :aws_access_key_id      => ENV['FP_AWS_KEY_ID'],
            :aws_secret_access_key  => ENV['FP_AWS_SECRET']
        }
      
        config.fog_directory  = ENV["FP_AWS_BUCKET_PROD"]
        config.storage = :fog
  
    else
        config.storage = :file
    end
  
end