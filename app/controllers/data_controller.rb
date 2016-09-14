class DataController < ApplicationController
	def get_data
		skills = Skill.sorted
		render :json => skills.to_json(:only => [:skill_name, :level]), :callback => params[:callback]
  end
end
