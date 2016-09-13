class DataController < ApplicationController
	def get_data
    respond_to do |format|
      format.json {}
    end
  end
end
