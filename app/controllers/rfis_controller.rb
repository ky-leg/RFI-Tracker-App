class RfisController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_record
    before_action :authorize
    
    def show 
        rfi = Rfi.find(params[:id])
        render json: rfi
    end

    def create 
        user = User.find(session[:user_id])
        rfi = user.rfis.create!(rfi_params)
        projects = Project.all
        render json: projects, status: :created
    end

    def update 
        rfi = Rfi.find(params[:id])
        rfi.update!(rfi_params)
        render json: rfi
    end

    # DELETE /rfis/:id
    def destroy 
        rfi = Rfi.find(params[:id])
        rfi.destroy
        head :no_content
    end

    private 

    def authorize
        return render json: { errors: ["Not authorized"] }, status: :unauthorized unless session.include? :user_id
    end

    def rfi_params
        params.permit(:project_id, :user_id, :title, :level, :body, :status, :rfi)
    end

    def invalid_record(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

end
