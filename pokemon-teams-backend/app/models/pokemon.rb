class Pokemon < ApplicationRecord
  belongs_to :trainer

  validate do 
    trainer_max_team?
  end

  private 

  def trainer_max_team?
    if self.trainer.pokemons.count >= 6 
      self.errors.add(:team_max, "The maximum pokemon per team is 6.")
    end
  end
end
