class SpecificSkillsController < ApplicationController
  
	layout 'admin'
  
  before_action :confirm_logged_in
  
  def index
    @specific_skills = SpecificSkill.sorted
  end

  def new
    @specific_skill = SpecificSkill.new
  end
  
  def create
    @specific_skill = SpecificSkill.new(specific_skill_params)
    if @specific_skill.save
      redirect_to(:action => 'index')
    else
      render('new')
    end
  end

  def edit
    @specific_skill = SpecificSkill.find(params[:id])
  end
  
  def update
    @specific_skill = SpecificSkill.find(params[:id])
    if @specific_skill.update_attributes(specific_skill_params)
      redirect_to(:action => 'index')
    else
      render('edit')
    end
  end

  def delete
    @specific_skill = SpecificSkill.find(params[:id])
  end
  
  def destroy
    SpecificSkill.find(params[:id]).destroy
    redirect_to(:action => 'index')
  end
  
  private
  
	  def specific_skill_params
	    params.require(:specific_skill).permit(:category, :name, :size)
	  end

end
