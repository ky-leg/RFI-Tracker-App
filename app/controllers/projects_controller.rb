class ProjectsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_record

    def index
        projects = Project.all
        render json: projects
    end

    def show 
        project = Project.find(params[:id])
        render json: project, include: ['rfis', 'rfis.users']
    end

    def create 
        project = Project.create!(project_params)
        projects = Project.all
        render json: projects, status: :created
    end

    def show_projects
        user = User.find(params[:id])
        projects = user.projects
        render json: projects
    end

    private
    def invalid_record(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def project_params
        params.permit(:title, :location)
    end

end
