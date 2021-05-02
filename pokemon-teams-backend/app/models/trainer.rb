class Trainer < ApplicationRecord
  has_many :pokemons

  def team_size
    pokemons.size
  end

  def max_team_size
    6
  end

  def team_full?
    team_size >= max_team_size
  end
end
