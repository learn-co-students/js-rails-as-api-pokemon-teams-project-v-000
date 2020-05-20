class Pokemon < ApplicationRecord
  belongs_to :trainer

  validate do
    team_size_valid?
  end


  private
  def team_size_valid?
    if self.trainer.pokemons.count >= 6
      self.errors.add(:team_size, "Too many pokemon!")
    end
  end
end
