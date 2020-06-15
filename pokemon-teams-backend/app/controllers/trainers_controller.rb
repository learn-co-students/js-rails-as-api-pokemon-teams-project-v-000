class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        render json: TrainingSerializer.new(trainers).to_serialized_json
    end

    def show
        trainer = Trainer.find_by(:id => params[:id])
        render json: TrainingSerializer.new(trainer).to_serialized_json
    end
end
