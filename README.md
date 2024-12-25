# NamespaceStdRemover
По нажатию комбинации клавиш Ctrl+Shift+U убирает строчку "using namespace std;" из кода и прописывает "std::" там, где это необходимо
# Функционал
Плагин удаляет строчку "using namespace std;", далее ищет в коде имена из этого пространства, и при условии, что это самостоятельная функция, а не, например, член класса, прописывает std:: перед ней
# Examples of usage

Source code:
vector<int> pathfortarget(vector<int>& v, int target)
{
    vector<int> res(v.size());
    for (int i = v.size() - 1; i + 1; i--)
    {
        if (v[i] >= target)
            target--;
        else
            target++;
        res[i] = target;
    }
    return res;
}

Result code:
std::vector<int> pathfortarget(std::vector<int>& v, int target)
{
    std::vector<int> res(v.size());
    for (int i = v.size() - 1; i + 1; i--)
    {
        if (v[i] >= target)
            target--;
        else
            target++;
        res[i] = target;
    }
    return res;
}

# Shortcut
Ctrl+Alt+U