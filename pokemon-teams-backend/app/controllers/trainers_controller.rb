class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        # render json: TrainerSerializer.new(trainers).to_json #DID NOT WORK
        render json: trainers
    end

    def show
        trainer = Trainer.find_by(id: params[:id])
        # render json: TrainerSerializer.new(trainer) #DID NOT WORK
        render json: trainer
    end
end