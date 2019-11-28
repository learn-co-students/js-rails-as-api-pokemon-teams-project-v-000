class TrainersController < ApplicationController
    def show
         trainer = Trainer.find_by(id: params[:id])
         if trainer 
            render json: TrainerSerializer.new(trainer).make_json
         else
            render json: {message: "shite"}
         end
    end 
end
