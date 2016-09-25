class BadgesController < ApplicationController
  
  layout 'admin'
  
  before_action :confirm_logged_in
  
  def index
    @badges = Badge.sorted
  end

  def new
    @badge = Badge.new
  end
  
  def create
    @badge = Badge.new(badge_params)
    if @badge.save
      redirect_to(:action => 'index')
    else
      render('new')
    end
  end

  def edit
    @badge = Badge.find(params[:id])
  end
  
  def update
    @badge = Badge.find(params[:id])
    if @badge.update_attributes(badge_params)
      redirect_to(:action => 'index')
    else
      render('edit')
    end
  end

  def delete
    @badge = Badge.find(params[:id])
  end
  
  def destroy
    Badge.find(params[:id]).destroy
    redirect_to(:action => 'index')
  end
  
  private
  
	  def badge_params
	    params.require(:badge).permit(:name, :image_url, :link)
	  end

end
