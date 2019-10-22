class TrainersController < ApplicationController
  def index
    trainer = Trainer.all
    render json: TrainerSerializer.new(trainer)
  end
end
