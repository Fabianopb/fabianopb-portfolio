class DataController < ApplicationController
	
	def get_data
		skills = Skill.sorted
		render :json => skills.to_json(:only => [:skill_name, :level]), :callback => params[:callback]
  end

  def sunburst
  	@business_skills = SpecificSkill.filter_category('Business')
  	@design_skills = SpecificSkill.filter_category('Design')
  	@technology_skills = SpecificSkill.filter_category('Technology')
  	respond_to do |format|
      format.json {}
    end
  end

end
