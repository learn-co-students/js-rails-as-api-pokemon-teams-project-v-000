class TrainersController < ApplicationController

    def index
        trainers = Trainer.all
        render json: trainers, only: [:id, :name]
    end
    
    def show
        trainer = Trainer.find(params[:id])
        render json: trainer, only: [:id, :name]
    end
end
